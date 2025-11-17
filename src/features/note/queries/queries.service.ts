import { NoteRepository } from "../repository";

import { GetAllNotesQueryResult } from "./get-all-notes.schema";
import { GetNoteQueryResult } from "./get-note.schema";

export class NotesQueriesService {
  constructor(private repository: NoteRepository) {}

  async getAllNotes(): Promise<GetAllNotesQueryResult> {
    return this.repository.findAllNotes();
  }

  async getNoteById(id: string): Promise<GetNoteQueryResult | null> {
    return this.repository.findNoteById(id);
  }
}
