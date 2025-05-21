/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('GET /api/tasks - Error fetching tasks:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching tasks. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch (jsonError) {
    console.error('POST /api/tasks - JSON parsing error:', jsonError);
    return NextResponse.json({ error: 'Invalid request body: Malformed JSON.' }, { status: 400 });
  }

  // Validate title (after successful JSON parsing)
  if (!body || typeof body.title !== 'string' || body.title.trim() === '') {
    return NextResponse.json({ error: 'Title is required and must be a non-empty string.' }, { status: 400 });
  }

  try {
    const task = await prisma.task.create({
      data: {
        title: body.title.trim(), // Trim whitespace from title
        completed: false,        // Explicitly set completed to false as per original logic
      },
    });
    return NextResponse.json(task, { status: 201 }); // Return 201 Created
  } catch (dbError) {
    console.error('POST /api/tasks - Database operation error:', dbError);
    return NextResponse.json(
      { message: 'An error occurred while creating the task. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const { id, completed, title } = await req.json();
  const data: any = {};
  if (typeof completed === 'boolean') data.completed = completed;
  if (typeof title === 'string') data.title = title;
  const task = await prisma.task.update({
    where: { id },
    data,
  });
  return NextResponse.json(task);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.task.delete({ where: { id } });
  return NextResponse.json({ success: true });
}