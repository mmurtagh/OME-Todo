import React from 'react'
import { View } from 'react-native'
import {
  Button,
  Dialog,
  Headline,
  Portal,
  RadioButton,
  Text,
  Title,
  Switch,
  Subheading,
  Divider,
} from 'react-native-paper'
import { SafeAreaView } from 'react-native'
import { getColor } from '../../resources/colors'

export default function FilterDialog({ isVisible, onHide }) {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onHide}>
        <Dialog.Title>Filters</Dialog.Title>
        <Dialog.Content>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
          >
            <Subheading>Show In Progress Todos</Subheading>
            <Switch color={getColor('primary')} value={true} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
          >
            <Subheading>Show Completed Todos</Subheading>
            <Switch color={getColor('primary')} value={true} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
          >
            <Subheading>Show Overdue Todos</Subheading>
            <Switch color={getColor('primary')} value={true} />
          </View>
          <Divider style={{ marginBottom: 10 }} />
          <RadioButton.Group value={'first'}>
            <Title>Sort By</Title>
            <RadioButton.Item label="Name Ascending" value="first" />
            <RadioButton.Item label="Name Descending" value="second" />
            <RadioButton.Item label="Target Date Ascending" value="second" />
            <RadioButton.Item label="Target Date Descending" value="second" />
          </RadioButton.Group>
          <Button mode="contained" color={getColor('primary')}>
            Reset Filters
          </Button>
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
          <Button
            color={getColor('primary')}
            style={{ marginLeft: 5 }}
            mode="text"
            onPress={onHide}
          >
            Apply
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
