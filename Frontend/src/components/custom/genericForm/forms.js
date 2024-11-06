//import zod schemas here
import { touristSchema } from "./form-schemas/touristSchema";
import { tourGuideSchema } from "./form-schemas/tourGuideSchema";
import { sellerSchema } from "./form-schemas/sellerSchema";
import { itinerarySchema } from "./form-schemas/itinerarySchema";
import { advertiserSchema } from "./form-schemas/advertiserSchema";
import { activitySchema } from "./form-schemas/activitySchema";
import { siteSchema } from "./form-schemas/siteSchema";
import { productSchema } from "./form-schemas/productSchema";
import { companyProfileSchema } from "./form-schemas/companyProfileSchema";
import { previousWorkSchema } from "./form-schemas/previousWorkSchema";
import { complaintSchema } from "./form-schemas/complaintSchema";

//import rendered fields here
import { tourist } from "./rendered-fields/touristFields";
import { activity } from "./rendered-fields/activityFields";
import { site } from "./rendered-fields/siteFields";
import { product } from "./rendered-fields/productFields";
import { company } from "./rendered-fields/companyFields";
import { previousWork } from "./rendered-fields/previousWorkFields";
import { tourGuide } from "./rendered-fields/tourGuideFields";
import { seller } from "./rendered-fields/sellerFields";
import { advertiser } from "./rendered-fields/advertiserFields";
import { itinerary } from "./rendered-fields/itineraryFields";
import { complaint } from "./rendered-fields/complaintFields";

//import submit handlers here
import { touristSubmit } from "./submit-handlers/touristHandler";
import { tourGuideSubmit } from "./submit-handlers/tourGuideHandler";
import { sellerSubmit } from "./submit-handlers/sellerHandler";
import { itinerarySubmit } from "./submit-handlers/itineraryHandler";
import { advertiserSubmit } from "./submit-handlers/advertiserHandler";
import { activitySubmit } from "./submit-handlers/activityHandler";
import { siteSubmit } from "./submit-handlers/siteHandler";
import { productSubmit } from "./submit-handlers/productHandler";
import { companySubmit } from "./submit-handlers/companyHandler";
import { experienceSubmit } from "./submit-handlers/experienceHandler";
import { complaintSubmit } from "./submit-handlers/complaintHandler";

/*
    Forms for the generic form component should be generated based on this object:

    {
        zodSchema: *import your zod schema made in form-schemas and put it here*,
        renderedFields: *define the fields you want to render in the form, including the type of input fields you want.*,
        defaultValues: *define the default values for the fields in the form*,
        onSubmit: *define the function that should be called when the form is submitted*,
    }
    
    You should avoid defining the form schema, fields, and other form-related data in this component. 
    Instead, create a separate file to define the form schema and other related data, and then import it into the component.

    For zod schemas, define them in the form-schemas folder.
    For adding input fields, define them in the input-fields folder.
    For renderedFields, define them in the rendered-fields folder along with defaultValues (I don't think theres any need for that much separation of concerns).
    For onSubmit, define them in the submit-handlers folder.

    In this file, we'll only define a map that has objects based on the above structure.
*/

export const forms = {

  tourist: {
    zodSchema: touristSchema,
    renderedFields: tourist.fields,
    defaultValues: tourist.defaultValues,
    onSubmit: touristSubmit,
  },

  tourGuide: {
    zodSchema: tourGuideSchema,
    renderedFields: tourGuide.fields,
    defaultValues: tourGuide.defaultValues,
    onSubmit: tourGuideSubmit,
  },

  seller: {
    zodSchema: sellerSchema,
    renderedFields: seller.fields,
    defaultValues: seller.defaultValues,
    onSubmit: sellerSubmit,
  },

  itinerary: {
    zodSchema: itinerarySchema,
    renderedFields: itinerary.fields,
    defaultValues: itinerary.defaultValues,
    onSubmit: itinerarySubmit,
  },

  advertiser: {
    zodSchema: advertiserSchema,
    renderedFields: advertiser.fields,
    defaultValues: advertiser.defaultValues,
    onSubmit: advertiserSubmit,
  },

  activity: {
    zodSchema: activitySchema,
    renderedFields: activity.fields,
    defaultValues: activity.defaultValues,
    onSubmit: activitySubmit,
  },

  site: {
    zodSchema: siteSchema,
    renderedFields: site.fields,
    defaultValues: site.defaultValues,
    onSubmit: siteSubmit,
  },

  product: {
    zodSchema: productSchema,
    renderedFields: product.fields,
    defaultValues: product.defaultValues,
    onSubmit: productSubmit,
  },

  company: {
    zodSchema: companyProfileSchema,
    renderedFields: company.fields,
    defaultValues: company.defaultValues,
    onSubmit: companySubmit,
  },

  experience: {
    zodSchema: previousWorkSchema,
    renderedFields: previousWork.fields,
    defaultValues: previousWork.defaultValues,
    onSubmit: experienceSubmit,
  },

  complaint: {
    zodSchema:complaintSchema,
    renderedFields: complaint.fields,
    defaultValues: complaint.defaultValues,
    onSubmit: complaintSubmit,
  }
};
