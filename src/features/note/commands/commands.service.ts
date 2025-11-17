import { NotFoundApiError } from "../../../shared/errors/api/not-found.error";
import sanitize from "../../../shared/utils/sanitizer";
import { NoteRepository } from "../repository";
import {
  CreateNoteCommandInput,
  CreateNoteCommandResult,
} from "./create-note.schema";
import {
  UpdateNoteCommandInput,
  UpdateNoteCommandResult,
} from "./update-note.schema";

export class NotesCommandsService {
  constructor(private repository: NoteRepository) {}

  async createNote(
    commandInput: CreateNoteCommandInput
  ): Promise<CreateNoteCommandResult> {
    const { content } = commandInput;
    const sanitizedContent = sanitize(content);

    const note = await this.repository.createNote({
      ...commandInput,
      content: sanitizedContent,
    });

    return note;
  }

  async updateNote(
    id: string,
    commandInput: UpdateNoteCommandInput
  ): Promise<UpdateNoteCommandResult> {
    const { content } = commandInput;

    const noteToUpdate = await this.repository.findNoteById(id);

    if (!noteToUpdate) {
      throw new NotFoundApiError("Cannot find note to update");
    }

    const newNote = {
      ...noteToUpdate,
      ...commandInput,
      content: content ? sanitize(content) : noteToUpdate?.content,
    };

    return await this.repository.updateNote(id, newNote);
  }

  async deleteNote(id: string): Promise<void> {
    await this.repository.deleteNote(id);
  }
}
