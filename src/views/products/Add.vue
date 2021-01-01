<template>
  <div class="container add-cont mt-3">
    <form @submit="submit">
      <div class="row">
        <div class="col-md-6 h-100">
          <div class="form-row">
            <div class="form-group">
              <label for="name">Product Name</label>
              <span class="required"></span>
              <input
                id="name"
                required
                class="form-control"
                type="text"
                placeholder="Product Name"
              />
            </div>
            <div class="row">
              <div class="form-group col-md-6">
                <label for="category">Category</label>
                <span class="required"></span>
                <input
                  id="category"
                  type="text"
                  class="form-control"
                  placeholder="Category"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="brand">Brand</label>
                <input
                  placeholder="Product brand"
                  id="brand"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <editor
                output-format="text"
                tinymce-script-src="https://cdnjs.cloudflare.com/ajax/libs/tinymce/5.6.2/tinymce.min.js"
                required="true"
                id="description"
                plugins="lists code"
                class="form-control"
              />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="images">Product Images</label>
            <editor-content />
          </div>
          ss
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";

export default {
  components: { EditorContent },
  data: () => ({
    editor: null,
  }),
  mounted() {
    this.editor = new Editor({
      content: "<p>This is just a boring paragraph</p>",
    });
  },
  beforeUnmount() {
    this.editor.destroy();
  },
  methods: {
    submit() {},
  },
};
</script>

<style scoped>
.add-cont {
  color: hsla(0, 0%, 100%, 0.8) !important;
}
input,
textarea {
  background: var(--bs-lighter) !important;
  /* border: 0.2px solid var(--bs-info) !important; */
  border: none;
  border-radius: 1px;
  color: hsla(0, 0%, 100%, 0.6) !important;
  padding: 0.8rem 1rem;
}
span:before {
  content: "*";
  font-size: 1rem;
  position: absolute;
  color: var(--bs-info);
  margin: 0.1rem;
}
.form-group {
  margin-bottom: 0.5rem;
}
</style>
<style>
.tox,
.tox-editor {
  background: red !important;
}
</style>