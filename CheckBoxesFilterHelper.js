({
  loadContacts: function (component) {
    let action = component.get("c.getContacts");

    action.setCallback(this, function (response) {
      let state = response.getState();
      if (state === "SUCCESS") {
        let records = response.getReturnValue();

        records.forEach(function (record) {
          record.linkName = "/" + record.Id;
        });
        component.set("v.data", records);
      }
    });
    $A.enqueueAction(action);
  },

  searchRecordOnFilter: function (component) {
    let action = component.get("c.getContactDetailsFilter");

    let StringList = JSON.parse(JSON.stringify(component.get("v.ListValue")));

    action.setParams({
      name: StringList,
    });

    action.setCallback(this, function (response) {
      let state = response.getState();
      if (state === "SUCCESS") {
        let contacts = response.getReturnValue();

        contacts.forEach(function (contact) {
          contact.linkName = "/" + contact.Id;
        });
        component.set("v.data", contacts);
      }
    });

    $A.enqueueAction(action);
  },
});
