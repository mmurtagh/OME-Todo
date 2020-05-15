import React, { useState } from 'react'
import moment from 'moment'
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
  Caption,
} from 'react-native-paper'
import { getColor } from '../../resources/colors'
import DateSelectDialog, { dialogMode } from './DateSelectDialog'
import { addTodo, deleteTodo, updateTodo } from '../../redux/actions'

function TodoDetail({ todo = {}, update, add, remove, navigation }) {
  const [currentMode, setCurrentMode] = useState(dialogMode.hidden)
  const [name, setName] = useState(todo.name)
  const [description, setDescription] = useState(todo.description)
  const [targetDate, setTargetDate] = useState(todo.targetDate || null)
  const [completionDate, setCompletionDate] = useState(
    todo.completionDate || null
  )
  const [isNameErrored, setIsNameErrored] = useState(false)

  const onAdd = () => {
    if (!name || name === '') {
      setIsNameErrored(true)
      return
    }

    navigation.goBack()

    const newTodo = {
      name,
      description,
      targetDate,
      completionDate,
    }

    add(newTodo)
  }

  const onSaveChanges = () => {
    if (!name || name === '') {
      setIsNameErrored(true)
      return
    }

    navigation.goBack()

    const modifiedTodo = {
      ...todo,
      name,
      description,
      targetDate,
      completionDate,
    }

    update(modifiedTodo)
  }

  const onDelete = () => {
    navigation.goBack()
    remove(todo.id)
  }

  return (
    <Portal.Host>
      <DateSelectDialog
        mode={currentMode}
        onHide={() => setCurrentMode(dialogMode.hidden)}
        targetDate={targetDate}
        completionDate={completionDate}
        setTargetDate={setTargetDate}
        setCompletionDate={setCompletionDate}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 10 }}>
          <Card style={{ marginBottom: 10 }}>
            <Card.Content>
              <View style={{ paddingBottom: 10 }}>
                <TextInput
                  error={isNameErrored}
                  mode="outlined"
                  label="Name"
                  value={name}
                  style={{ backgroundColor: 'white', paddingBottom: 10 }}
                  onChangeText={(text) => {
                    setIsNameErrored(false)
                    setName(text)
                  }}
                  onFocus={() => setIsNameErrored(false)}
                  onBlur={() => setIsNameErrored(false)}
                />
                {isNameErrored && (
                  <Caption
                    // set position to absolute to prevent shifting layout
                    // when error message is displayed
                    style={{
                      bottom: 0,
                      position: 'absolute',
                      color: getColor('danger'),
                    }}
                  >
                    Required
                  </Caption>
                )}
              </View>
              <TextInput
                multiline
                numberOfLines={5}
                mode="outlined"
                label="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
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
                  {targetDate ? moment(targetDate).format('ll') : 'None'}
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
                  {completionDate
                    ? moment(completionDate).format('ll')
                    : 'In Progress'}
                </Button>
              </View>
            </Card.Content>
            <Card.Actions />
          </Card>
          <Button
            style={{ marginBottom: 10 }}
            mode="contained"
            onPress={!todo?.id ? onAdd : onSaveChanges}
          >
            {!todo?.id ? 'Add Todo' : 'Save Changes'}
          </Button>
          <Button
            style={{ marginBottom: 10 }}
            mode="contained"
            color={getColor('danger')}
            onPress={onDelete}
          >
            Delete
          </Button>
        </View>
      </SafeAreaView>
    </Portal.Host>
  )
}

function mapStateToProps({ todos }, { route }) {
  const { id } = route.params

  // find the todo associated with the id passed in via
  // navigation parameters and return it as a prop
  return {
    todo: todos.find((todo) => todo.id === id),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    update: (todo) => {
      dispatch(updateTodo(todo))
    },
    add: (todo) => {
      dispatch(addTodo(todo))
    },
    remove: (id) => {
      dispatch(deleteTodo(id))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoDetail)
