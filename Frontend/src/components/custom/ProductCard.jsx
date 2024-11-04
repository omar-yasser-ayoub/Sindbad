import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";

import ImagePlaceholder from "@/components/custom/ImagePlaceholder";
import GenericForm from "./genericForm/genericForm";
import StarRating from "./StarRating";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"

import { updateProduct } from "@/services/ProductApiHandler";
import { getMyProducts } from "@/services/SellerApiHandler";

import { ArrowRight, Wallet, EllipsisVertical } from 'lucide-react';

import { useUser } from "@/state management/userInfo";

function ProductCard({ data, setData, parent, fetchProducts }) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { toast } = useToast();

	const navigate = useNavigate();
	const { profileId } = parent === "profile" ? useParams() : { undefined };
	const { role, id } = useUser();

	// Function to copy the link to clipboard
	const handleCopyLink = () => {
		const link = `http://localhost:5173/app/product/${data._id}`;
		navigator.clipboard.writeText(link)
			.then(() => {
				toast({
					description: "Link copied to clipboard",
				});
			})
			.catch((err) => console.error('Failed to copy link: ', err));
	};

	// Function to share via email
	const handleShareEmail = () => {
		const subject = encodeURIComponent("Check out this product!");
		const body = encodeURIComponent(`Here's a product I found on Sindbad:\nhttp://localhost:5173/app/product/${data._id}`);
		window.location.href = `mailto:?subject=${subject}&body=${body}`;
	};

	const toggleArchive = async () => {
		const updatedProducts = await updateProduct(data._id, { isArchived: !data.isArchived });
		if (updatedProducts) {
			if (parent === "profile") {
				const myProducts = await getMyProducts(profileId);
				if (myProducts) {
					setData(myProducts);
				}
			}
			else {
				fetchProducts();
			}
			toast({
				description: `Product ${data.isArchived ? "unarchived" : "archived"} successfully`,
			});
		}
	}

	return (
		<article className={`w-full h-full flex flex-col border rounded-md overflow-clip group bg-gradient-to-br from-light
		${data.isArchived === true ?
				"to-neutral-300/50 border-neutral-300/80" : "to-primary-700/50 border-primary-700/80"}`}>
			<div className="h-[156px] relative shrink-0 bg-neutral-300">
				{/* If picture is available, show it, otherwise show placeholder */}
				{data.imageUris ? (
					<img
						src={data.imageUris[0]}
						alt={data.name}
						className="object-cover h-full w-full"
					/>
				) : (
					<ImagePlaceholder />
				)}
				<DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)} modal={false}>
					<DropdownMenuTrigger asChild>
						<div className={`icon-button ${isDropdownOpen && 'opacity-100'}`}>
							<EllipsisVertical fill="currentColor" size={16} />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						<DropdownMenuItem onClick={handleCopyLink}>Copy link</DropdownMenuItem>
						<DropdownMenuItem onClick={handleShareEmail}>Share via email</DropdownMenuItem>
						{((role === "seller" && id === data.seller) || role === "admin") &&
							<>
								<DropdownMenuItem onClick={() => setIsDialogOpen(true)}>Edit</DropdownMenuItem>
								<DropdownMenuItem onClick={() => toggleArchive()}>{data.isArchived === true ? "Unarchive" : "Archive"}</DropdownMenuItem>
							</>
						}
					</DropdownMenuContent>
				</DropdownMenu>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogContent className="overflow-y-scroll max-h-[50%]">
						<DialogHeader>
							<GenericForm type="product" id={id} data={data} />
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
			<div className="flex flex-col p-3 gap-2 h-full justify-between">
				<h4 className="text-base font-semibold line-clamp-2">
					{data.name}
				</h4>
				<div className="flex flex-col gap-1">
					{/* Product name */}
					<StarRating rating={data.averageRating ? data.averageRating : 0} size={16} />
					<div className="text-neutral-500 flex gap-1 items-center">
						<Wallet size={16} />
						<p className="text-xs leading-[11px] font-medium text-neutral-500">
							{data.price ? `${data.price}EGP` : "N/A"}
						</p>
					</div>
					<Button onClick={() => navigate(`/app/product/${data._id}`)}
						className={`mt-2 ${data.isArchived === true ? "bg-neutral-300" : "bg-primary-700"}`}
					>
						<p className="text-xs">Read more</p>
						<div className="shrink-0">
							<ArrowRight size={13} />
						</div>
					</Button>
				</div>
			</div>
		</article>
	);
}

export default ProductCard;
