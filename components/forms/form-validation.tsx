import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { DefaultValues, FieldValues, FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { ZodSchema } from 'zod'

interface FormValidationProps<T extends FieldValues> {
  schema: ZodSchema<T>
  defaultValues?: DefaultValues<T>
  onSubmit: (data: T) => void
  children: (methods: UseFormReturn<T>) => React.ReactNode
}

export function FormValidation<T extends FieldValues>({ schema, defaultValues, onSubmit, children }: FormValidationProps<T>) {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onTouched',
  })
  return (
    <FormProvider {...methods}>
      <>{children(methods as UseFormReturn<T>)}</>
    </FormProvider>
  )
} 