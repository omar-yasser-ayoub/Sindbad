import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import GoogleMapWrite from '@/components/custom/maps/GoogleMapWrite';

export const CoordinatesField = ({ name, control, label, latitude, longitude }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label || name.toUpperCase()}</FormLabel>
          <FormControl>
            <GoogleMapWrite
              lat={latitude}
              lng={longitude}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
