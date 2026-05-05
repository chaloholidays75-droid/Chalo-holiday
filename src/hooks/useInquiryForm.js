import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { submitInquiry } from '@/services/inquiryService'

/**
 * Encapsulates all inquiry form state + submit logic.
 * Used by both InquiryPage and any inline InquiryForm component.
 */
export function useInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      destination: '',
      travel_date: '',
      travelers: '',
      budget: '',
      message: '',
    },
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await submitInquiry(data)
      setIsSuccess(true)
      form.reset()
      toast.success('Inquiry sent! We will contact you within 24 hours.')
    } catch (error) {
      toast.error(error.message || 'Failed to send inquiry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { form, onSubmit, isSubmitting, isSuccess }
}