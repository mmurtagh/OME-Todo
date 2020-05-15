import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import moment from 'moment'
import { Button, Dialog, Portal } from 'react-native-paper'
import { getColor } from '../../resources/style'
import RNDatePicker from '@react-native-community/datetimepicker'
import { getContent } from '../../resources/content'

// @name DatePicker
// @description
// Modal component used to pick a target or completion date within TodoDetail
// Must be handled differently between ios and android due to the os specific
// implementation of RNDatePicker
// @params {bool} isVisible - whether or not the modal is currently visible
// @params {bool} isTargetDate - whether or not the modal is currently selecting a target
// date or a completion date. Changes the modal title on ios
// @params {fn} apply - function used to apply changes when selecting a new date
// @params {fn} hide - function that hides the modal when called
// @params {string} currentDate - the initially selected date when the modal becomes visible
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

  // When the modal becomes visible, we need to make sure the date displayed
  // by the date picker is the initial date passed in via the currentDate prop
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
              apply(
                moment(date)
                  .endOf('day')
                  .format()
              )
            }}
          >
            {getContent('apply')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

// The RNDatePicker in android is a modal in itself and doesn't need to
// be wrapped in a Dialog component like ios
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
        apply(
          moment(val)
            .endOf('day')
            .format()
        )
      }}
      value={new Date(date)}
    />
  )
}
