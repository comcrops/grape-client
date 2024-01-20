import { describe, it, expect } from "vitest"

import { mount } from "@vue/test-utils"
import Input from "@/components/ui/Input.vue"

describe("Input", () => {
  it("renders properly", () => {
    const wrapper = mount(Input, {
      props: {
        label: "Label",
        type: "text",
      },
    })

    expect(wrapper.html()).toContain("Label")
    expect(wrapper.find("input")).toBeDefined()
  })
})
