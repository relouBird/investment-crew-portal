import { reactive, computed } from "vue";
import * as yup from "yup";
import type { AxiosResponse } from "axios";

export default function useForm<T extends Record<string, any>>(
  schema: yup.ObjectSchema<T>,
  defaultValues: Partial<T> = {}
) {
  const formData = reactive({ ...defaultValues }) as T;
  const errors = reactive<Record<string, string[]>>({});
  const processing = reactive({ value: false });

  const isInValid = computed(() => {
    return Object.values(errors).some((e) => e.length > 0);
  });

  const isValid = computed(() => !isInValid.value);

  async function validate(): Promise<boolean> {
    try {
      await schema.validate(formData, { abortEarly: false });
      clearErrors();
      return true;
    } catch (err: any) {
      clearErrors();
      if (err.inner) {
        err.inner.forEach((e: yup.ValidationError) => {
          if (e.path) {
            if (!errors[e.path]) errors[e.path] = [];
            errors[e.path].push(e.message);
          }
        });
      }
      return false;
    }
  }

  async function validateField(field: keyof T) {
    try {
      await schema.validateAt(field as string, formData);
      errors[field as string] = [];
    } catch (err: any) {
      errors[field as string] = [err.message];
    }
  }

  async function submit(
    handler: () => Promise<AxiosResponse>
  ): Promise<AxiosResponse | null> {
    const valid = await validate();
    if (!valid) return null;

    processing.value = true;

    try {
      const response = await handler();
      clearErrors();
      return response;
    } catch (err: any) {
      console.error("Submit error:", err);
      if (err.response?.data?.errors) {
        Object.assign(errors, err.response.data.errors);
      }
      return err.response || null;
    } finally {
      processing.value = false;
    }
  }

  function reset(values?: Partial<T>) {
    Object.assign(formData, values || defaultValues);
    clearErrors();
  }

  function clearErrors() {
    Object.keys(errors).forEach((key) => delete errors[key]);
  }

  return {
    data: formData,
    errors,
    isValid,
    isInValid,
    processing,
    submit,
    validate,
    validateField,
    reset,
    clear: clearErrors,
  };
}
