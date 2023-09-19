import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Homepage from './index.vue'

describe('Homepage', () => {
  const wrapper = mount(Homepage)
  test('default number of days', () => {
    expect(wrapper.vm.$refs.daysToShow).toBe(7)
  })

  // test('select a different number of days', () => {
  //   wrapper.vm.$refs.daysToShow.value = 5
  //   expect(wrapper.vm.$refs.calendarDays.value.length).toBe(10)
  // })
})