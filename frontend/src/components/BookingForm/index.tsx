import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { User, PlusCircle } from 'lucide-react'
import { createBooking } from 'api/bookings.api'
import { useRoomContext } from 'context/RoomContext'
import type { ApiError } from 'api/client'
import type { DateRange } from 'components/DateRangePicker'
import { DateRangePicker } from 'components/DateRangePicker'
import { FormInput, FormTextarea } from './styled'

interface FormValues {
  user_name: string
  date_range: DateRange | undefined
  notes: string
}


export function BookingForm() {
  const { t } = useTranslation()
  const { state, dispatch, markRoomBooked } = useRoomContext()
  const [serverError, setServerError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { date_range: undefined } })

  if (state.selectedRoomId === null) { return null }

  if (state.loading) {
    return (
      <div className="bg-white border border-outline-variant rounded-xl p-stack-lg sticky top-24 flex items-center justify-center min-h-[320px]">
        <div className="flex flex-col items-center gap-stack-md text-outline">
          <svg className="animate-spin w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-label-sm">{t('common.loading')}</span>
        </div>
      </div>
    )
  }

  const onSubmit = async (values: FormValues) => {
    const { date_range } = values
    if (!date_range?.from) { return }

    const toLocalDateString = (d: Date, endOfDay: boolean) => {
      const pad = (n: number) => String(n).padStart(2, '0')
      const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
      return endOfDay ? `${date} 23:59:59` : `${date} 00:00:00`
    }

    setServerError(null)
    setSubmitting(true)
    try {
      const res = await createBooking({
        room_id: state.selectedRoomId!,
        user_name: values.user_name,
        start_time: toLocalDateString(new Date(date_range.from), false),
        end_time: toLocalDateString(new Date(date_range.to ?? date_range.from), true),
      })
      dispatch({ type: 'ADD_BOOKING', payload: res.data })
      markRoomBooked(state.selectedRoomId!)
      reset()
    } catch (err) {
      const apiErr = err as ApiError
      setServerError(apiErr.message || t('booking.createError'))
    } finally {
      setSubmitting(false)
    }
  }

  const userNameReg = register('user_name', {
    required: t('validation.nameRequired'),
    minLength: { value: 2, message: t('validation.nameTooShort') },
  })
  const notesReg = register('notes')

  const userNameField = (
    <div className="space-y-1">
      <label className="text-body-sm font-medium text-on-surface-variant" htmlFor="user-name">
        {t('booking.userNameLabel')} <span className="text-error">*</span>
      </label>
      <div className="relative">
        <FormInput
          id="user-name"
          placeholder={t('booking.userNamePlaceholder')}
          aria-invalid={!!errors.user_name}
          name={userNameReg.name}
          ref={userNameReg.ref}
          onChange={userNameReg.onChange}
          onBlur={userNameReg.onBlur}
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
          <User size={18} />
        </span>
      </div>
      {errors.user_name && (
        <span className="text-label-md text-error block">{errors.user_name.message}</span>
      )}
    </div>
  )

  const dateRangeField = (
    <div className="space-y-1">
      <label className="text-body-sm font-medium text-on-surface-variant">
        {t('booking.dateRangeLabel')} <span className="text-error">*</span>
      </label>
      <Controller
        name="date_range"
        control={control}
        rules={{ validate: v => !!v?.from || t('validation.dateRangeRequired') }}
        render={({ field }) => (
          <DateRangePicker
            value={field.value}
            onChange={field.onChange}
            hasError={!!errors.date_range}
          />
        )}
      />
      {errors.date_range && (
        <span className="text-label-md text-error block">{errors.date_range.message as string}</span>
      )}
    </div>
  )

  const notesField = (
    <div className="space-y-1">
      <label className="text-body-sm font-medium text-on-surface-variant" htmlFor="notes">
        {t('booking.notesLabel')}
      </label>
      <FormTextarea
        id="notes"
        rows={2}
        placeholder={t('booking.notesPlaceholder')}
        name={notesReg.name}
        ref={notesReg.ref}
        onChange={notesReg.onChange}
        onBlur={notesReg.onBlur}
      />
    </div>
  )

  const submitButton = (
    <div className="pt-stack-md space-y-stack-sm">
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-primary text-white py-3 rounded-lg font-bold text-label-md hover:bg-primary-container transition-colors flex items-center justify-center gap-stack-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale"
      >
        <span><PlusCircle size={18} /></span>
        {submitting ? '...' : t('booking.createButton')}
      </button>
    </div>
  )

  return (
    <div className="bg-white border border-outline-variant rounded-xl p-stack-lg sticky top-24">
      <h2 className="text-headline-sm font-bold text-on-surface mb-stack-lg">{t('booking.newBooking')}</h2>
      {serverError && (
        <div className="mb-stack-md p-stack-md bg-error-container border border-outline-variant rounded-lg">
          <p className="text-label-md text-on-error-container">{serverError}</p>
        </div>
      )}
      <form className="space-y-stack-md" onSubmit={handleSubmit(onSubmit)}>
        {userNameField}
        {dateRangeField}
        {notesField}
        {submitButton}
      </form>
    </div>
  )
}
