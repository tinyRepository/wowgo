import { focusOnFirstError } from "@/utils/helpers";

function blurFocusedInput() {
  const focusedInput = document.querySelector(":focus");
  if (focusedInput) {
    focusedInput.blur();
  }
}

export default {
  methods: {
    validateForm(group) {
      return new Promise((resolve, reject) => {
        const v = group ? this.$v[group] : this.$v;
        v.$touch();
        if (v.$invalid) {
          blurFocusedInput();
          reject(new Error("Invalid form"));
          this.$nextTick(focusOnFirstError);
        } else {
          resolve();
        }
      });
    }
  }
};
