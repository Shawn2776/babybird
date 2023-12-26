export async function PUT(request) {
  const requestUrl = new URL(request.url);

  const newTheme = requestUrl.searchParams.get("userTheme");

  const session = await getServerSession(options);

  if (!session || session.user === "unauthenticated") {
    return redirect("/");
  }

  const email = session.user.email;

  try {
    const res = await prisma.user.update({
      where: {
        email,
      },
      data: {
        theme: newTheme,
      },
    });
  } catch (error) {
    console.log("error", error);
  }

  return NextResponse.json({ message: "success" });
}
