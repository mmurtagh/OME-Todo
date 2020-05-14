import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Checkbox, Dialog, Portal } from 'react-native-paper'
import { SafeAreaView } from 'react-native'
import { getColor } from '../../resources/colors'
import DatePicker from '@react-native-community/datetimepicker'

export const dialogMode = {
  hidden: 'HIDDEN',
  completionDate: 'COMPLETION_DATE',
  targetDate: 'TARGET_DATE',
}

export default function DateSelectDialog({ isVisible, onHide, mode }) {
  const [checkboxState, setCheckboxState] = useState(true)

  let title = 'Target Date'
  let checkboxLabel = 'This todo has no target date'

  if (mode === dialogMode.completionDate) {
    title = 'Completion Date'
    checkboxLabel = 'This todo is still in progress'
  }

  return (
    <Portal>
      <Dialog visible={mode !== dialogMode.hidden} onDismiss={onHide}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          {!checkboxState && <DatePicker value={Date.now()} />}
          <Checkbox.Item
            label={checkboxLabel}
            uncheckedColor="red"
            status={checkboxState ? 'checked' : 'unchecked'}
            onPress={() => setCheckboxState(!checkboxState)}
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
          <Button style={{ marginLeft: 5 }} mode="text" onPress={onHide}>
            Apply
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
