import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
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
import { getColor } from '../../resources/colors'
import { sortByOptions, setFilter, resetFilter } from '../../redux/actions'

const sortByLabels = {
  [sortByOptions.nameDesc]: 'Name Descending',
  [sortByOptions.nameAsc]: 'Name Ascending',
  [sortByOptions.targetDateDesc]: 'Target Date Descending',
  [sortByOptions.targetDateAsc]: 'Target Date Ascending',
}

function FilterDialog({ isVisible, onHide, filter, apply, reset }) {
  const [sortBy, setSortBy] = useState(filter.sortBy)
  const [showInProgress, setShowInProgress] = useState(filter.showInProgress)
  const [showCompleted, setShowCompleted] = useState(filter.showCompleted)
  const [showOverdue, setShowOverdue] = useState(filter.showOverdue)

  useEffect(() => {
    if (isVisible) {
      setSortBy(filter.sortBy)
      setShowInProgress(filter.showInProgress)
      setShowCompleted(filter.showCompleted)
      setShowOverdue(filter.showOverdue)
    }
  }, [isVisible])

  onApply = () => {
    apply({
      showInProgress,
      showCompleted,
      showOverdue,
      sortBy,
    })

    onHide()
  }

  onReset = () => {
    reset()
    onHide()
  }

  const radioButtons = () => {
    return Object.keys(sortByOptions).map((option) => (
      <RadioButton.Item
        key={option}
        label={sortByLabels[sortByOptions[option]]}
        value={sortByOptions[option]}
        onPress={() => setSortBy(sortByOptions[option])}
      />
    ))
  }

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
            <Switch
              color={getColor('primary')}
              value={showInProgress}
              onValueChange={() => setShowInProgress(!showInProgress)}
            />
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
            <Switch
              color={getColor('primary')}
              value={showCompleted}
              onValueChange={() => setShowCompleted(!showCompleted)}
            />
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
            <Switch
              color={getColor('primary')}
              value={showOverdue}
              onValueChange={() => setShowOverdue(!showOverdue)}
            />
          </View>
          <Divider style={{ marginBottom: 10 }} />
          <RadioButton.Group value={sortBy}>
            <Title>Sort By</Title>
            {radioButtons()}
          </RadioButton.Group>
          <Button
            onPress={onReset}
            mode="contained"
            color={getColor('primary')}
          >
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
            onPress={onApply}
          >
            Apply
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

function mapStateToProps(state) {
  return {
    filter: state.filter,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    apply: (filter) => dispatch(setFilter(filter)),
    reset: () => dispatch(resetFilter()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterDialog)
