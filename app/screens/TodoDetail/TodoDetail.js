import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Text, View, SafeAreaView } from 'react-native'
import {
  Card,
  Title,
  TextInput,
  Headline,
  IconButton,
  Button,
  Subheading,
  Portal,
} from 'react-native-paper'
import { getColor } from '../../resources/colors'
import DateSelectDialog, { dialogMode } from './DateSelectDialog'

function TodoDetail({ route }) {
  const { data } = route.params
  const [nameValue, setNameValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [currentMode, setCurrentMode] = useState(dialogMode.hidden)

  return (
    <Portal.Host>
      <DateSelectDialog
        mode={currentMode}
        onHide={() => setCurrentMode(dialogMode.hidden)}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 10 }}>
          <Card style={{ marginBottom: 10 }}>
            <Card.Content>
              <TextInput
                mode="outlined"
                label="Name"
                value={nameValue}
                style={{ backgroundColor: 'white', paddingBottom: 10 }}
                onChangeText={(text) => setNameValue(text)}
              />
              <TextInput
                multiline
                numberOfLines={5}
                mode="outlined"
                label="Description"
                value={descriptionValue}
                onChangeText={(text) => setDescriptionValue(text)}
                style={{ backgroundColor: 'white', paddingBottom: 10 }}
              />
            </Card.Content>
          </Card>
          <Card style={{ marginBottom: 10 }}>
            <Card.Content>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Subheading>Target Date:</Subheading>
                <Button
                  mode="text"
                  icon="pencil"
                  onPress={() => setCurrentMode(dialogMode.targetDate)}
                >
                  Aug 14, 2020
                </Button>
              </View>
            </Card.Content>
            <Card.Actions />
          </Card>
          <Card style={{ marginBottom: 10 }}>
            <Card.Content>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Subheading>Completion Date:</Subheading>
                <Button
                  mode="text"
                  icon="pencil"
                  onPress={() => setCurrentMode(dialogMode.completionDate)}
                >
                  In Progress
                </Button>
              </View>
            </Card.Content>
            <Card.Actions />
          </Card>
          <Button style={{ marginBottom: 10 }} mode="contained">
            Save Changes
          </Button>
          <Button
            style={{ marginBottom: 10 }}
            mode="contained"
            color={getColor('danger')}
          >
            Delete
          </Button>
        </View>
      </SafeAreaView>
    </Portal.Host>
  )
}

export default connect()(TodoDetail)
