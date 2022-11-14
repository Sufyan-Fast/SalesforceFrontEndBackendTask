({
  Init: function (component, event, helper) {
    component.set("v.columns", [
      {
        label: "Name",
        fieldName: "linkName",
        type: "url",
        typeAttributes: { label: { fieldName: "Name" }, target: "_blank" },
      },
      { label: "Email", fieldName: "Email", type: "Email" },
      { label: "Phone", fieldName: "Phone", type: "Phone" },
    ]);

    helper.loadContacts(component);
  },
});
