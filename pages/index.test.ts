import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Homepage from './index.vue'

describe('homepage', () => {
  const wrapper = mount(Homepage)
  it('default number of days', () => {
    expect(wrapper.vm.$refs.daysToShow).toBe(7)
  })

  // test('select a different number of days', () => {
  //   wrapper.vm.$refs.daysToShow.value = 5
  //   expect(wrapper.vm.$refs.calendarDays.value.length).toBe(10)
  // })
})
