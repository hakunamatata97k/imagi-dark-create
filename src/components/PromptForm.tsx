
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageGenerationRequest } from "@/services/api";

const formSchema = z.object({
  prompt: z.string().min(3, {
    message: "Prompt must be at least 3 characters.",
  }),
  size: z.enum(["256x256", "512x512", "1024x1024", "1792x1024", "1024x1792"], {
    required_error: "Please select an image size.",
  }),
});

type PromptFormValues = z.infer<typeof formSchema>;

interface PromptFormProps {
  onSubmit: (values: ImageGenerationRequest) => void;
  isLoading: boolean;
}

export default function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const [charCount, setCharCount] = useState(0);
  
  const form = useForm<PromptFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      size: "1024x1024",
    },
  });

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharCount(e.target.value.length);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data))} className="space-y-6">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Your Prompt</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="A futuristic logo for a tech startup with purple and blue colors..."
                    className="pr-16 bg-muted/50"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handlePromptChange(e);
                    }}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    {charCount}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-muted/50">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="256x256">Small (256x256)</SelectItem>
                  <SelectItem value="512x512">Medium (512x512)</SelectItem>
                  <SelectItem value="1024x1024">Large (1024x1024)</SelectItem>
                  <SelectItem value="1792x1024">Wide (1792x1024)</SelectItem>
                  <SelectItem value="1024x1792">Tall (1024x1792)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Generating..." : "Generate Image"}
        </Button>
      </form>
    </Form>
  );
}
