import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import {
  Button,
  Card,
  Divider,
  Headline,
  IconButton,
  Paragraph,
  Subheading,
  Text,
} from 'react-native-paper'

import { getColor, spacing } from '../../resources/style'
import { getContent } from '../../resources/content'

const variants = {
  inProgress: 'IN_PROGRESS',
  completed: 'COMPLETED',
  overDue: 'OVERDUE',
}

const styles = StyleSheet.create({
  bold: { fontWeight: 'bold' },
  completeButton: { flex: 1, marginLeft: spacing('small') },
  completedTodo: {
    marginBottom: spacing('small'),
    backgroundColor: getColor('success', true),
  },
  descriptionContainer: { flexDirection: 'row' },
  editButtonWithComplete: { flex: 1, marginRight: spacing('small') },
  labelValueContainer: { flexDirection: 'row', alignItems: 'center' },
  normalTodo: { marginBottom: spacing('small'), backgroundColor: '#fff' },
  overdueTodo: {
    marginBottom: spacing('small'),
    backgroundColor: getColor('danger', true),
  },
  rowContainer: { flexDirection: 'row', alignItems: 'center' },
  soloEditButton: { flex: 1 },
  subheading: { fontWeight: 'bold', paddingRight: spacing() },
})

// @name Todo
// @description
// Component representing a single todo item in a todo list
// Can style as a normal todo, a complete todo, or an overdue todo
// @params {string} id - id of the todo
// @params {string} name - name of the todo; will always have a non-null value
// @params {string} description - description of the todo; may be null
// @params {string} targetDate - target date of the todo; may be null
// @params {string} completionDate - completion date of the todo; may be null
// @params {obj} navigation - navigation object provided by react-navigation
// @params {fn} complete - function used to complete the todo
export default function Todo({
  id,
  name,
  description,
  targetDate,
  completionDate,
  navigation,
  complete,
}) {
  let variant = variants.inProgress
  let cardStyle = styles.normalTodo

  // determine the variant of the todo (in progress, complete, overdue) for use in styling
  if (completionDate) {
    variant = variants.completed
    cardStyle = styles.completedTodo
  } else if (
    targetDate &&
    moment(Date.now()).utc() > moment(targetDate).utc()
  ) {
    variant = variants.overDue
    cardStyle = styles.overdueTodo
  }

  const getVariantIcon = () => {
    if (variant === variants.inProgress) return null

    const color =
      variant === variants.completed ? getColor('success') : getColor('danger')
    const icon =
      variant === variants.completed ? 'check-outline' : 'alert-circle-outline'

    return <IconButton color={color} icon={icon} />
  }

  return (
    <Card style={cardStyle}>
      <Card.Content>
        <View style={styles.labelValueContainer}>
          <Headline style={styles.bold}>{name}</Headline>
          {getVariantIcon()}
        </View>
        <Divider />
        <View style={styles.labelValueContainer}>
          <Subheading style={styles.subheading}>Target Date:</Subheading>
          <Text>
            {targetDate ? moment(targetDate).format('ll') : getContent('none')}
          </Text>
        </View>
        {variant === variants.completed && (
          <>
            <Divider />
            <View style={styles.labelValueContainer}>
              <Subheading style={styles.subheading}>
                {`${getContent('completionDate')}:`}
              </Subheading>
              <Text>{moment(completionDate).format('ll')}</Text>
            </View>
          </>
        )}
        {!!description && (
          <>
            <Divider />
            <View style={styles.descriptionContainer}>
              <Subheading style={styles.subheading}>
                {`${getContent('description')}:`}
              </Subheading>
              <Paragraph style={{ flex: 1 }}>{description}</Paragraph>
            </View>
          </>
        )}
      </Card.Content>
      <Card.Actions>
        <Button
          color={getColor('primary')}
          style={
            variant === variants.completed
              ? styles.soloEditButton
              : styles.editButtonWithComplete
          }
          icon="pencil"
          onPress={() => navigation.navigate('TodoDetail', { id })}
        >
          {getContent('edit')}
        </Button>
        {variant !== variants.completed && (
          <Button
            icon="check-bold"
            color={getColor('success')}
            style={styles.completeButton}
            onPress={() => complete(id)}
          >
            {getContent('complete')}
          </Button>
        )}
      </Card.Actions>
    </Card>
  )
}

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  targetDate: PropTypes.string,
  completionDate: PropTypes.string,
}
