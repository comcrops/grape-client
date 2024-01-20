import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import Button from "@/components/ui/Button.vue"

describe("Button", () => {
  it("renders properly", () => {
    const wrapper = mount(Button, {
      slots: {
        default: "Click me",
      },
    })
    expect(wrapper.html()).toContain("Click me")
  })
})