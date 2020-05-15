import React, { useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import {
  Card,
  TextInput,
  Button,
  Subheading,
  Portal,
  Caption,
} from 'react-native-paper'
import { getColor, spacing } from '../../resources/style'
import DateSelectDialog, { dialogMode } from './DateSelectDialog'
import { addTodo, deleteTodo, updateTodo } from '../../redux/actions'
import { getContent } from '../../resources/content'

const styles = StyleSheet.create({
  bottomMargin: { marginBottom: spacing() },
  bottomPadding: { paddingBottom: spacing() },
  container: { flex: 1 },
  dateSelectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

function TodoDetail({ todo, update, add, remove, navigation }) {
  const [currentMode, setCurrentMode] = useState(dialogMode.hidden)
  const [name, setName] = useState(todo.name)
  const [description, setDescription] = useState(todo.description)
  const [targetDate, setTargetDate] = useState(todo.targetDate || null)
  const [completionDate, setCompletionDate] = useState(
    todo.completionDate || null
  )
  const [isNameErrored, setIsNameErrored] = useState(false)

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
                <Subheading>{`${getContent('targetDate')}:`}</Subheading>
                <Button
                  mode="text"
                  icon="pencil"
                  onPress={() => setCurrentMode(dialogMode.targetDate)}
                >
                  {targetDate
                    ? moment(targetDate).format('ll')
                    : getContent('none')}
                </Button>
              </View>
            </Card.Content>
          </Card>
          <Card style={{ marginBottom: spacing() }}>
            <Card.Content>
              <View style={styles.dateSelectContainer}>
                <Subheading>{`${getContent('completionDate')}:`}</Subheading>
                <Button
                  mode="text"
                  icon="pencil"
                  onPress={() => setCurrentMode(dialogMode.completionDate)}
                >
                  {completionDate
                    ? moment(completionDate).format('ll')
                    : getContent('inProgress')}
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
          <Button
            style={styles.bottomMargin}
            mode="contained"
            color={getColor('danger')}
            onPress={onDelete}
          >
            {getContent('delete')}
          </Button>
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
