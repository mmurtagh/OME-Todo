import React, { useState } from 'react'
import moment from 'moment'
import { View } from 'react-native'
import {
  Button,
  Card,
  Caption,
  Text,
  IconButton,
  Paragraph,
  Headline,
  Subheading,
  Divider,
} from 'react-native-paper'

import { getColor } from '../../resources/colors'

const variants = {
  inProgress: 'IN_PROGRESS',
  completed: 'COMPLETED',
  overDue: 'OVERDUE',
}

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
  if (completionDate) {
    variant = variants.completed
  } else if (targetDate && Date.now() > targetDate) {
    variant = variants.overDue
  }

  let backgroundColor = 'white'
  if (variant === variants.completed) {
    backgroundColor = getColor('success', true)
  } else if (variant === variants.overDue) {
    backgroundColor = getColor('danger', true)
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
    <Card
      style={{
        marginBottom: 5,
        backgroundColor: backgroundColor,
      }}
    >
      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Headline style={{ fontWeight: 'bold' }}>{name}</Headline>
          {getVariantIcon()}
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Subheading style={{ fontWeight: 'bold', paddingRight: 10 }}>
            Target Date:
          </Subheading>
          <Text>{targetDate ? moment(targetDate).format('ll') : 'None'}</Text>
        </View>
        <Divider />
        {variant === variants.completed && (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Subheading style={{ fontWeight: 'bold', paddingRight: 10 }}>
                Completion Date:
              </Subheading>
              <Text>{moment(completionDate).format('ll')}</Text>
            </View>
          </>
        )}
        {!!description && (
          <>
            <Divider />
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Subheading style={{ fontWeight: 'bold', paddingRight: 10 }}>
                Description:
              </Subheading>
              {!!description && (
                <Paragraph style={{ flex: 1 }}>{description}</Paragraph>
              )}
            </View>
          </>
        )}
      </Card.Content>
      <Card.Actions>
        <Button
          color={getColor('primary')}
          style={{
            flex: 1,
            marginRight: variant === variants.completed ? 0 : 5,
          }}
          icon="pencil"
          onPress={() => navigation.navigate('TodoDetail', { id })}
        >
          Edit
        </Button>
        {variant !== variants.completed && (
          <Button
            icon="check-bold"
            color={getColor('success')}
            style={{ flex: 1, marginLeft: 5 }}
            onPress={() => complete(id)}
          >
            Complete
          </Button>
        )}
      </Card.Actions>
    </Card>
  )
}
