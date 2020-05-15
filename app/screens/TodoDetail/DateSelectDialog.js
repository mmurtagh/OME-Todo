import React, { useEffect, useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Button, Checkbox, Dialog, Portal } from 'react-native-paper'
import { getColor, spacing } from '../../resources/style'
import DatePicker from '@react-native-community/datetimepicker'
import { getContent } from '../../resources/content'

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

    setDate(isChecked ? null : moment(date).format())
    onHide()
  }

  // when the mode changes, we need to set all the content to the correct
  // strings, and set the date state to the correct date
  useEffect(() => {
    if (mode === dialogMode.hidden) return

    const isTargetDate = mode === dialogMode.targetDate

    setTitle(
      isTargetDate ? getContent('targetDate') : getContent('completionDate')
    )
    setIsChecked(isTargetDate ? !targetDate : !completionDate)
    setCheckboxLabel(
      isTargetDate ? getContent('noTargetDate') : getContent('todoInProgress')
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
            style={{ marginRight: spacing('small') }}
            mode="text"
            onPress={onHide}
          >
            {getContent('cancel')}
          </Button>
          <Button
            style={{ marginLeft: spacing('small') }}
            mode="text"
            onPress={applyChanges}
          >
            {getContent('apply')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

DateSelectDialog.propTypes = {
  onHide: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  targetDate: PropTypes.string,
  completionDate: PropTypes.string,
  setCompletionDate: PropTypes.func.isRequired,
  setTargetDate: PropTypes.func.isRequired,
}
