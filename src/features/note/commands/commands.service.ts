import { FastifyBaseLogger } from "fastify";
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
import { Logger } from "../../../shared/types/logger";

export class NotesCommandsService {
  constructor(private repository: NoteRepository, private logger: Logger) {}

  async createNote(
    commandInput: CreateNoteCommandInput
  ): Promise<CreateNoteCommandResult> {
    const { content } = commandInput;
    const sanitizedContent = sanitize(content);

    const note = await this.repository.createNote({
      ...commandInput,
      content: sanitizedContent,
    });

    this.logger.info({ noteId: note.id, operation: "create" }, "Note created");

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

    const updatedNote = await this.repository.updateNote(id, newNote);

    this.logger.info(
      { noteId: updatedNote.id, operation: "update" },
      "Note updated"
    );

    return updatedNote;
  }

  async deleteNote(id: string): Promise<void> {
    await this.repository.deleteNote(id);

    this.logger.info({ noteId: id, operation: "delete" }, "Note deleted");
  }
}
