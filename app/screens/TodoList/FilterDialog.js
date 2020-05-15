import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  Title,
  Switch,
  Subheading,
  Divider,
} from 'react-native-paper'
import { getColor, spacing } from '../../resources/style'
import { sortByOptions, setFilter, resetFilter } from '../../redux/actions'
import { getContent } from '../../resources/content'

const sortByLabels = {
  [sortByOptions.nameDesc]: getContent('nameDesc'),
  [sortByOptions.nameAsc]: getContent('nameAsc'),
  [sortByOptions.targetDateDesc]: getContent('targetDateDesc'),
  [sortByOptions.targetDateAsc]: getContent('targetDateAsc'),
}

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing(),
  },
})

function FilterDialog({ isVisible, onHide, filter, apply, reset }) {
  const [sortBy, setSortBy] = useState(filter.sortBy)
  const [showInProgress, setShowInProgress] = useState(filter.showInProgress)
  const [showCompleted, setShowCompleted] = useState(filter.showCompleted)

  useEffect(() => {
    if (isVisible) {
      setSortBy(filter.sortBy)
      setShowInProgress(filter.showInProgress)
      setShowCompleted(filter.showCompleted)
    }
  }, [isVisible])

  onApply = () => {
    apply({
      showInProgress,
      showCompleted,
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
        <Dialog.Title>{getContent('filters')}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.switchContainer}>
            <Subheading>{getContent('showInProgress')}</Subheading>
            <Switch
              color={getColor('primary')}
              value={showInProgress}
              onValueChange={() => setShowInProgress(!showInProgress)}
            />
          </View>
          <View style={styles.switchContainer}>
            <Subheading>{getContent('showCompleted')}</Subheading>
            <Switch
              color={getColor('primary')}
              value={showCompleted}
              onValueChange={() => setShowCompleted(!showCompleted)}
            />
          </View>
          <Divider style={{ marginBottom: spacing() }} />
          <RadioButton.Group value={sortBy}>
            <Title>{getContent('sortBy')}</Title>
            {radioButtons()}
          </RadioButton.Group>
          <Button
            onPress={onReset}
            mode="contained"
            color={getColor('primary')}
          >
            {getContent('resetFilters')}
          </Button>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            color={getColor('danger')}
            style={{ marginRight: spacing('small') }}
            mode="text"
            onPress={onHide}
          >
            {getContent('cancel')}
          </Button>
          <Button
            color={getColor('primary')}
            style={{ marginLeft: spacing('small') }}
            mode="text"
            onPress={onApply}
          >
            {getContent('apply')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

FilterDialog.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    showInProgress: PropTypes.bool,
    showCompleted: PropTypes.bool,
    searchString: PropTypes.string,
    sortBy: PropTypes.string,
  }).isRequired,
  apply: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
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
