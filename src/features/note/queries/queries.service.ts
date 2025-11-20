import { NoteRepository } from "../repository";

import { GetAllNotesQueryResult } from "./get-all-notes.schema";
import { GetNoteQueryResult } from "./get-note.schema";
import { Logger } from "../../../shared/types/logger";
import { NotFoundApiError } from "../../../shared/errors/api/not-found.error";

export class NotesQueriesService {
  constructor(private repository: NoteRepository, private logger: Logger) {}

  async getAllNotes(): Promise<GetAllNotesQueryResult> {
    const notes = await this.repository.findAllNotes();
    this.logger.info(
      { count: notes.length, operation: "getAll" },
      "Found notes"
    );
    return notes;
  }

  async getNoteById(id: string): Promise<GetNoteQueryResult> {
    const note = await this.repository.findNoteById(id);
    if (note) {
      this.logger.info({ noteId: note.id, operation: "getById" }, "Note found");
    } else {
      throw new NotFoundApiError("Note not found");
    }
    return note;
  }
}
