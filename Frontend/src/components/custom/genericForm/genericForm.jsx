import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ArrayField } from "./input-fields/ArrayField";
import { ObjectArrayField } from "./input-fields/ObjectArrayField";
import { CheckboxField } from "./input-fields/CheckboxField";
import { CoordinatesField } from "./input-fields/CoordinatesField";
import { TextField } from "./input-fields/TextField";
import { TextArea } from './input-fields/TextArea';
import { FileUpload } from './input-fields/FileUploadField';
import { forms } from "./forms";
import { SelectField } from "./input-fields/SelectField";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCurrency } from "@/state management/userInfo";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";
import { MultiSelectField } from "./input-fields/MultiSelectField";
import { DateTimeField } from "./input-fields/DateTimeField";
import SpinnerSVG from "@/SVGs/Spinner";

export function GenericForm({ type, data, id, fetcher }) {
	// If you need more information about how this component works, check out forms.js in the same folder.
	const formObject = forms[type];
	const onSubmit = formObject.onSubmit;
	const formSchema = z.object(formObject.zodSchema);
	const formFields = formObject.renderedFields;

	// Clone defaultValues to avoid mutation issues
	const defaultValues = structuredClone(formObject.defaultValues);

	// Helper function to format date fields
	// HACK: Zenacious
	const formatDateFields = (fields, values) => {
		fields.forEach((field) => {
			if (field.type === "date" && values[field.name]) {
				values[field.name] = new Date(values[field.name])
					.toISOString()
					.split("T")[0];
			} else if (field.type === "object" && values[field.name]) {
				formatDateFields(field.fields, values[field.name]);
			} else if (
				field.type === "objectArray" &&
				Array.isArray(values[field.name])
			) {
				values[field.name].forEach((item) =>
					formatDateFields(field.fields, item)
				);
			}
		});
	};

	// If data is passed, overwrite default values with data values
	if (data) {
		for (const key in defaultValues) {
			if (data[key]) {
				defaultValues[key] = data[key];
			}
		}
		// formatDateFields(formFields, defaultValues);
	}

	// Create the form using react-hook-form.
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues,
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const currency = useCurrency();
	const { toast } = useToast();
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (values) => {
		try {
			if (typeof onSubmit === "function") {
				if (onSubmit.length === 7) {
					await onSubmit(values, id, navigate, dispatch, currency, toast, setLoading);
				} else {
					await onSubmit(values, id, data, navigate, dispatch, currency, toast, setLoading);
				}
				if (typeof fetcher === "function") {
					fetcher();
				}
			}
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		console.log("LOADING: ", loading);
	}, [loading]);

	function renderField(field, path = "") {
		const fullPath = path ? `${path}.${field.name}` : field.name;

		switch (field.type) {
			case "array":
				return (
					<ArrayField
						key={fullPath}
						name={fullPath}
						control={form.control}
						initialValue={field.arrayType}
						label={field.label || field.name.toUpperCase()}
						description={field.description}
					/>
				);

			case "coordinates":
				return (
					<CoordinatesField
						key={fullPath}
						name={fullPath}
						control={form.control}
						label={field.label || field.name.toUpperCase()}
						latitude={field.latitude}
						longitude={field.longitude}
						description={field.description}
					/>
				);

			case "object":
				return (
					<div key={fullPath}>
						<h3 className={`${fullPath.split(".").length === 1 ? "text-base font-semibold mb-2" : "text-sm font-semibold"}`}>
							{field.label || field.name.toUpperCase()}
						</h3>
						<div className={`${fullPath.split(".").includes("openingHours") && fullPath.split(".").length === 2 ? "flex gap-8 text-neutral-600" : "flex gap-2 flex-col"}`}>
							{field.fields.map((nestedField) =>
								renderField(nestedField, fullPath)
							)}
						</div>
					</div>
				);

			case "objectArray":
				return (
					<ObjectArrayField
						key={fullPath}
						name={fullPath}
						control={form.control}
						initialValue={field.fields.reduce(
							(acc, curr) => ({
								...acc,
								[curr.name]: curr.type === "number" ? 0 : "",
							}),
							{}
						)}
						label={field.label || field.name.toUpperCase()}
						fieldsSchema={field.fields}
						description={field.description}
					/>
				);

			case "checkbox":
				return (
					<CheckboxField
						key={fullPath}
						name={fullPath}
						control={form.control}
						label={field.label || field.name.toUpperCase()}
						description={field.description}
					/>
				);
			case "select":
				return (
					<SelectField
						key={fullPath}
						name={fullPath}
						control={form.control}
						label={field.label || field.name.toUpperCase()}
						options={field.options}
						defaultValue={defaultValues[fullPath]}
						description={field.description}
					/>
				);
			case "multiSelect":
				return (
					<MultiSelectField
						key={fullPath}
						name={fullPath}
						control={form.control}
						label={field.label || field.name.toUpperCase()}
						options={field.options}
						defaultValue={defaultValues[fullPath]}
						description={field.description}
					/>
				);

			case "date":
				return (
					<DateTimeField
						key={fullPath}
						name={fullPath}
						control={form.control}
						type={field.type}
						label={field.label || field.name.toUpperCase()}
						description={field.description}
					/>
				);
			case "dateText":
			case "text":
			case "number":
			case "time":
				return (
					<TextField
						key={fullPath}
						name={fullPath}
						control={form.control}
						type={field.type}
						label={field.label || field.name.toUpperCase()}
						description={field.description}
					/>
				);
			case 'textArea':
				return (
					<TextArea
						key={fullPath}
						name={fullPath}
						control={form.control}
						type={field.type}
						label={field.label || field.name.toUpperCase()}
						description={field.description}
					/>
				);
			case 'file':
				return (
					<FileUpload
						key={fullPath}
						name={fullPath}
						control={form.control}
						type={field.type}
						label={field.label || field.name.toUpperCase()}
						description={field.description}
					/>
				);
			default:
				return null;
		}
	}

	function navigateBack() {
		if (["tourist", "tourGuide", "seller", "advertiser", "admin", "tourismGovernor", "company", "experience"].includes(type)) {
			navigate("/app/profile");
		}
		else {
			navigate(-1);
		}
	}

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
					{formFields.map((field) => renderField(field))}
					<div className="flex justify-between">
						{type !== "complaint" && type !== "flightBooking" &&
							<Button disabled={loading} type="button" onClick={() => navigateBack()} variant="link" className="p-0 text-xs">
								Cancel
							</Button>
						}
						<Button type="submit" disabled={loading} className="w-[72px] justify-center mt-2">
							{loading ? <SpinnerSVG /> : "Submit"}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
export default GenericForm;
