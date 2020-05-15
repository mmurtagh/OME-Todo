import React, { useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import {
  Button,
  Caption,
  Card,
  Portal,
  Subheading,
  TextInput,
} from 'react-native-paper'
import { getColor, spacing } from '../../resources/style'
import DatePicker from './DatePicker'
import { addTodo, deleteTodo, updateTodo } from '../../redux/actions'
import { getContent } from '../../resources/content'

const styles = StyleSheet.create({
  bottomMargin: { marginBottom: spacing() },
  bottomPadding: { paddingBottom: spacing() },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  container: { flex: 1 },
  date: { fontWeight: 'bold' },
  labelSubheading: { paddingRight: spacing() },
  dateSelectContainer: {
    paddingBottom: spacing(),
    flexDirection: 'row',
    alignItems: 'center',
  },
  padding: { padding: spacing() },
  textInput: { paddingBottom: spacing(), backgroundColor: '#fff' },
  validation: {
    bottom: 0,
    position: 'absolute',
    color: getColor('danger'),
  },
  validationContainer: { paddingBottom: spacing() },
})

// We use different modes to drive the behavior of the
// date picker dialog.
const dialogModes = { target: 'TARGET', completion: 'COMPLETION', none: 'NONE' }

// if we're adding a new todo, make the title say "New Todo"
// if were editing an existing todo, make the title say "Edit Todo"
TodoDetail.navigationOptions = ({ route }) => {
  const { id } = route.params

  let headerTitle = getContent('editTodo')
  if (id === null) {
    headerTitle = getContent('newTodo')
  }

  return {
    headerTitle,
  }
}

// @name TodoDetail
// @description
// Screen component used to both edit and add new todos.
// Allows the user to associated a name, description, target date,
// and completion date with a todo. Name is the only required field
// @params {obj} todo - the todo object that is being edits. defaults to
// an empty object when creating a new todo
// @params {fn} update - function used to update an existing todo.
// @params {fn} add - function used to add a new todo.
// @params {fn} remove - function used to remove an existing todo
// @params {obj} navigation - navigation object provided by react-navigation
function TodoDetail({ todo, update, add, remove, navigation }) {
  const [dialogMode, setDialogMode] = useState(dialogModes.none)
  const [name, setName] = useState(todo.name)
  const [description, setDescription] = useState(todo.description)
  const [targetDate, setTargetDate] = useState(todo.targetDate || null)
  const [completionDate, setCompletionDate] = useState(
    todo.completionDate || null
  )
  const [isNameErrored, setIsNameErrored] = useState(false)

  // Called when "Add Todo" button is pressed
  const onAdd = () => {
    if (!name) {
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

  // Called when "Save Changes" button is pressed
  const onSaveChanges = () => {
    if (!name) {
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

  // Called when "Delete" button is pressed
  const onDelete = () => {
    navigation.goBack()
    remove(todo.id)
  }

  return (
    <Portal.Host>
      <DatePicker
        isVisible={dialogMode !== dialogModes.none}
        apply={
          dialogMode === dialogModes.target ? setTargetDate : setCompletionDate
        }
        hide={() => setDialogMode(dialogModes.none)}
        currentDate={
          dialogMode === dialogModes.target ? targetDate : completionDate
        }
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.padding}>
          <Card style={styles.bottomMargin}>
            <Card.Content>
              <View style={styles.bottomPadding}>
                <TextInput
                  error={isNameErrored}
                  mode="outlined"
                  label={getContent('name')}
                  value={name}
                  style={styles.textInput}
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
                    style={styles.validation}
                  >
                    {getContent('required')}
                  </Caption>
                )}
              </View>
              <TextInput
                multiline
                numberOfLines={5}
                mode="outlined"
                label={getContent('description')}
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={styles.textInput}
              />
            </Card.Content>
          </Card>
          <Card style={styles.bottomMargin}>
            <Card.Content>
              <View style={styles.dateSelectContainer}>
                <Subheading style={styles.labelSubheading}>{`${getContent(
                  'targetDate'
                )}:`}</Subheading>
                <Subheading style={styles.date}>
                  {targetDate
                    ? moment(targetDate).format('ll')
                    : getContent('none')}
                </Subheading>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => setDialogMode(dialogModes.target)}
                  mode="contained"
                >
                  {getContent('chooseDate')}
                </Button>
                <Button
                  onPress={() => setTargetDate(null)}
                  mode="contained"
                  color={getColor('danger')}
                >
                  {getContent('clearDate')}
                </Button>
              </View>
            </Card.Content>
          </Card>
          <Card style={{ marginBottom: spacing() }}>
            <Card.Content>
              <View style={styles.dateSelectContainer}>
                <Subheading style={styles.labelSubheading}>{`${getContent(
                  'completionDate'
                )}:`}</Subheading>
                <Subheading style={styles.date}>
                  {completionDate
                    ? moment(completionDate).format('ll')
                    : getContent('inProgress')}
                </Subheading>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => setDialogMode(dialogModes.completion)}
                  mode="contained"
                >
                  {getContent('chooseDate')}
                </Button>
                <Button
                  onPress={() => setCompletionDate(null)}
                  mode="contained"
                  color={getColor('danger')}
                >
                  {getContent('clearDate')}
                </Button>
              </View>
            </Card.Content>
          </Card>
          <Button
            style={styles.bottomMargin}
            mode="contained"
            onPress={!todo?.id ? onAdd : onSaveChanges}
          >
            {!todo?.id ? getContent('addTodo') : getContent('saveChanges')}
          </Button>
          {!!todo?.id && (
            <Button
              style={styles.bottomMargin}
              mode="contained"
              color={getColor('danger')}
              onPress={onDelete}
            >
              {getContent('delete')}
            </Button>
          )}
        </View>
      </SafeAreaView>
    </Portal.Host>
  )
}

TodoDetail.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    targetDate: PropTypes.string,
    completionDate: PropTypes.string,
  }),
  update: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

TodoDetail.defaultProps = {
  todo: {},
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
