import { PrismaClient, Note } from "@prisma/client";

type CreateNoteData = Omit<Note, "id" | "author" | "createdAt" | "isPublic"> & {
  isPublic?: boolean;
  author?: string | null;
};

export class NoteRepository {
  constructor(private prisma: PrismaClient) {}

  async findPublicNotes(): Promise<Note[]> {
    return this.prisma.note.findMany({ where: { isPublic: true } });
  }

  async findAllNotes(): Promise<Note[]> {
    return this.prisma.note.findMany();
  }

  async findNoteById(id: string): Promise<Note | null> {
    return this.prisma.note.findUnique({ where: { id } });
  }

  async updateNote(id: string, data: Partial<Note>): Promise<Note> {
    return this.prisma.note.update({ where: { id }, data });
  }

  async createNote(data: CreateNoteData): Promise<Note> {
    return this.prisma.note.create({ data });
  }

  async deleteNote(id: string): Promise<Note> {
    return this.prisma.note.delete({ where: { id } });
  }
}
