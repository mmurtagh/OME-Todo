import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import moment from 'moment'
import { Button, Dialog, Portal } from 'react-native-paper'
import { getColor } from '../../resources/style'
import RNDatePicker from '@react-native-community/datetimepicker'
import { getContent } from '../../resources/content'

export default function DatePicker(props) {
  if (Platform.OS === 'ios') {
    return <DatePickerIos {...props} />
  }

  return <DatePickerAndroid {...props} />
}

function DatePickerIos({ isVisible, isTargetDate, apply, hide, currentDate }) {
  const [date, setDate] = useState(
    currentDate ? currentDate : moment().format()
  )

  useEffect(() => {
    if (isVisible) {
      setDate(currentDate ? currentDate : moment().format())
    }
  }, [isVisible])

  return (
    <Portal>
      <Dialog onDismiss={hide} visible={isVisible}>
        <Dialog.Title>
          {getContent(isTargetDate ? 'targetDate' : 'completionDate')}
        </Dialog.Title>
        <Dialog.Content>
          <RNDatePicker
            onChange={(event, val) => setDate(val)}
            value={new Date(date)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button color={getColor('danger')}>{getContent('cancel')}</Button>
          <Button
            onPress={() => {
              hide()
              apply(moment(date).format())
            }}
          >
            {getContent('apply')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

function DatePickerAndroid({ isVisible, apply, hide, currentDate }) {
  const [date, setDate] = useState(
    currentDate ? currentDate : moment().format()
  )

  useEffect(() => {
    if (isVisible) {
      setDate(currentDate ? currentDate : moment().format())
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <RNDatePicker
      onChange={({ type }, val) => {
        if (type === 'dismissed') {
          return hide()
        }

        hide()
        setDate(moment(val).format())
        apply(moment(val).format())
      }}
      value={new Date(date)}
    />
  )
}
