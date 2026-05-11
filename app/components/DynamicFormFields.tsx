import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Field {
  name: string;
  label: string;
  placeholder?: string;
  type: string;
}

interface Props {
  fields: Field[];
  form: any; // You might want to replace `any` with the specific type of your form object
}

function DynamicFormFields({ fields, form }: Props) {
  return (
    <>
      {fields.map((field) => (
        <FormField
          key={field.name}
          control={form.control}
          name={field.name}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormItem>
              <FormLabel>{field.label}:</FormLabel>
              <FormControl>
                <Input
                  placeholder={field.placeholder}
                  type={field.type}
                  value={value}
                  onChange={(e) => onChange(field.type === 'number' ? +e.target.value : e.target.value)}
                  onBlur={onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
}

export default DynamicFormFields;












//cred ca asta e cam vechi

// import React from 'react';
// import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// interface Field {
//   name: string;
//   label: string;
//   placeholder?: string;
//   type: string;
// }

// interface Props {
//   fields: Field[];
//   form: any; // You might want to replace `any` with the specific type of your form object
// }

// function DynamicFormFields({ fields, form }: Props) {
//   return (
//     <>
//       {fields.map((field) => (
//         <FormField
//           key={field.name}
//           control={form.control}
//           name={field.name}
//           render={({ field: { onChange, onBlur, value } }) => (
//             <FormItem>
//               <FormLabel>{field.label}:</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder={field.placeholder}
//                   type={field.type}
//                   value={value}
//                   onChange={onChange}
//                   onBlur={onBlur}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       ))}
//     </>
//   );
// }

// export default DynamicFormFields;