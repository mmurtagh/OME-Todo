import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Button, Checkbox, Dialog, Portal } from 'react-native-paper'
import { getColor } from '../../resources/colors'
import DatePicker from '@react-native-community/datetimepicker'

export const dialogMode = {
  hidden: 'HIDDEN',
  completionDate: 'COMPLETION_DATE',
  targetDate: 'TARGET_DATE',
}

export default function DateSelectDialog({
  onHide,
  mode,
  targetDate,
  completionDate,
  setCompletionDate,
  setTargetDate,
}) {
  const [title, setTitle] = useState(null)
  const [date, setDate] = useState(null)
  const [isChecked, setIsChecked] = useState(true)
  const [checkboxLabel, setCheckboxLabel] = useState(null)

  // Applies the changes using the proper set function depending on the mode.
  // Sets the date to null if the checkbox is checked
  const applyChanges = () => {
    const setDate =
      mode === dialogMode.targetDate ? setTargetDate : setCompletionDate

    setDate(isChecked ? null : date)
    onHide()
  }

  // when the mode changes, we need to set all the content to the correct
  // strings, and set the date state to the correct date
  useEffect(() => {
    if (mode === dialogMode.hidden) return

    const isTargetDate = mode === dialogMode.targetDate

    setTitle(isTargetDate ? 'Target Date' : 'Completion Date')
    setIsChecked(isTargetDate ? !targetDate : !completionDate)
    setCheckboxLabel(
      isTargetDate ? 'This todo has no target date' : 'This todo is in progress'
    )
    setDate(isTargetDate ? targetDate : completionDate)
  }, [mode])

  return (
    <Portal>
      <Dialog visible={mode !== dialogMode.hidden} onDismiss={onHide}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          {!isChecked && (
            <DatePicker
              value={date === null ? new Date() : new Date(date)}
              onChange={(_, date) => setDate(date)}
            />
          )}
          <Checkbox.Item
            label={checkboxLabel}
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={() => setIsChecked(!isChecked)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            color={getColor('danger')}
            style={{ marginRight: 5 }}
            mode="text"
            onPress={onHide}
          >
            Cancel
          </Button>
          <Button style={{ marginLeft: 5 }} mode="text" onPress={applyChanges}>
            Apply
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
