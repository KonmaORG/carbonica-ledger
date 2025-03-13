import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const projectFormSchema = z.object({
  projectName: z.string().min(3, {
    message: "Project name must be at least 3 characters.",
  }),
  projectType: z.string({
    required_error: "Please select a project type.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  startDate: z.date({
    required_error: "A start date is required.",
  }),
  estimatedCompletion: z.date({
    required_error: "An estimated completion date is required.",
  }),
  emissionsTarget: z.string().min(1, {
    message: "Emissions reduction target is required.",
  }),
  description: z
    .string()
    .min(50, {
      message: "Description must be at least 50 characters.",
    })
    .max(1000, {
      message: "Description must not exceed 1000 characters.",
    }),
  supportingDocument: z.any(),
  documentHash: z.string(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface ProjectRegistrationFormProps {
  onSubmit: (data: ProjectFormValues) => void;
}

const PROJECT_TYPES = [
  "Forest Conservation",
  "Renewable Energy",
  "Methane Capture",
  "Energy Efficiency",
  "Reforestation",
  "Wetland Restoration",
  "Sustainable Agriculture",
  "Biodiversity Conservation",
  "Clean Transportation",
  "Other",
];

export function ProjectRegistrationForm({
  onSubmit,
}: ProjectRegistrationFormProps) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      description: "",
    },
  });

  const handleFormSubmit = (data: ProjectFormValues) => {
    onSubmit(data);
  };
  const [file, setFile] = React.useState<File | null>(null);
  const [fileHash, setFileHash] = React.useState<string>("");
  const [isUploading, setIsUploading] = React.useState(false);
  const calculateHash = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setIsUploading(true);
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    // Calculate hash for the file
    const hash = await calculateHash(uploadedFile);
    setFileHash(hash);

    // Update the form values
    form.setValue("supportingDocument", uploadedFile);
    form.setValue("documentHash", hash);
    setIsUploading(false);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Rainforest Conservation Initiative"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PROJECT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Amazon Basin, Manaus" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Brazil" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estimatedCompletion"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Estimated Completion Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emissionsTarget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emissions Reduction Target (tCO₂e)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g. 25000" {...field} />
                </FormControl>
                <FormDescription>
                  Estimated CO₂ equivalent to be reduced/sequestered
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your project, its environmental impact, and how it reduces carbon emissions..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a detailed description of your project, including
                methodology and expected outcomes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="border border-dashed border-gray-300 rounded-md p-6">
          <div className="flex flex-col items-center justify-center text-center">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <h3 className="font-medium">Upload Supporting Documents</h3>
            <p className="text-sm text-gray-500 mb-4">
              Drag and drop files here or click to browse (Methodology details,
              baseline studies, etc.)
            </p>
            <div className="w-full max-w-xs">
              <Input
                type="file"
                className="cursor-pointer"
                onChange={handleFileUpload}
                disabled={isUploading}
              />

              {isUploading && (
                <p className="text-sm text-amber-600 mt-2">
                  Calculating file hash...
                </p>
              )}
              {file && (
                <div className="mt-4 w-full">
                  <h4 className="text-sm font-medium mb-2">Uploaded File:</h4>
                  <div className="text-xs text-left p-2 border rounded-md">
                    <p>
                      <span className="font-medium">Name:</span> {file.name}
                    </p>
                    <p>
                      <span className="font-medium">Size:</span>{" "}
                      {Math.round(file.size / 1024)} KB
                    </p>
                    <p className="truncate">
                      <span className="font-medium">Hash:</span> {fileHash}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Upload PDF, DOCX, or ZIP files up to 50MB each
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Submit Project for Validation</Button>
        </div>
      </form>
    </Form>
  );
}
