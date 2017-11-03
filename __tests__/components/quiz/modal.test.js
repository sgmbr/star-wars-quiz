import React from 'react'
import renderer from 'react-test-renderer'
import Modal from '../../../src/components/quiz/modal'

describe('Modal component', () => {
  it('renders modal', () => {
    const onClick = () => {}
    const component = renderer.create(
      <Modal
        modalTitle='Correct Answer'
        answer='Luke Skywalker'
        onClick={onClick}
      />
    )

    expect(component).toMatchSnapshot()
  })

  it('throws error with wrong prop type', () => {
    const onClick = () => {}
    const component = renderer.create(
      <Modal
        modalTitle={onClick}
      />
    )

    expect(component).toMatchSnapshot()
  })
})
