import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteMultipleContacts, fetchContacts, getContactById, updateContactReadStatus } from '../actions/contactAction';

interface ContactState {
  contacts: Contact[];
  contact: Contact | null;
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed";
}

const initialState: ContactState = {
  contacts: [],
  contact: null,
  loading: false,
  error: null,
  status: "idle",
};


const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(getContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload;
        state.status = "idle";
      })
      .addCase(getContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch contact';
        state.status = "failed";
      })
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
        state.status = "idle";
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch contacts';
        state.status = "failed";
      })
      .addCase(deleteMultipleContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMultipleContacts.fulfilled, (state, action) => {
        state.loading = false;
    
        console.log('deleteMultipleContacts fulfilled'); // Log pour vérifier si le bloc fulfilled est exécuté
        console.log('Payload:', action.payload); // Log pour vérifier la structure du payload
    
        if (Array.isArray(action.payload.ids) && action.payload.ids.every((id: string) => typeof id === 'string')) {
            state.contacts = state.contacts.filter(contact => !action.payload.ids.includes(contact.id));
        } else {
            state.error = 'Invalid payload structure';
        }
    })
    .addCase(deleteMultipleContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to delete contact';
    })
    .addCase(updateContactReadStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateContactReadStatus.fulfilled, (state, action: PayloadAction<Contact>) => {
      state.loading = false;
      const updatedContact = action.payload;
      const index = state.contacts.findIndex((contact) => contact.id === updatedContact.id);
      if (index !== -1) {
        state.contacts[index] = updatedContact;
      }
    })
    .addCase(updateContactReadStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Failed to update contact read status';
    })
  }

});

export default contactSlice.reducer;
