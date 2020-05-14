import React, { useState } from 'react'
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

export default function Todo({
  id,
  name,
  description,
  targetCompletionDate,
  completionDate,
  navigation,
}) {
  const isCompleted = !!completionDate

  return (
    <Card
      style={{
        marginBottom: 5,
        backgroundColor: isCompleted ? getColor('success', true) : 'white',
      }}
    >
      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Headline style={{ fontWeight: 'bold', paddingRight: 10 }}>
            {name}
          </Headline>
          {!!completionDate && (
            <IconButton color={getColor('success')} icon="check-bold" />
          )}
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
          <Text>{targetCompletionDate}</Text>
        </View>
        <Divider />
        {isCompleted && (
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
              <Text>{targetCompletionDate}</Text>
            </View>
            <Divider />
          </>
        )}
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Subheading style={{ fontWeight: 'bold', paddingRight: 10 }}>
            Description:
          </Subheading>
          <Paragraph style={{ flex: 1 }}>{description}</Paragraph>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button
          color={getColor('primary')}
          style={{ flex: 1, marginRight: isCompleted ? 0 : 5 }}
          icon="pencil"
          onPress={() => navigation.navigate('TodoDetail', { id })}
        >
          Edit
        </Button>
        {!isCompleted && (
          <Button
            icon="check-bold"
            color={getColor('success')}
            style={{ flex: 1, marginLeft: 5 }}
          >
            Complete
          </Button>
        )}
      </Card.Actions>
    </Card>
  )
}
