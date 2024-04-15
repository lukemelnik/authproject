# Auth Project (Full-stack reddit clone using NextJs, Typescript, Prisma, zod, Tailwind & NextUI Component Library from Stephen Grider Course)

## Takeaways:

1. Caching: by default Next tries to deliver a static page from the cache. After updating page information with a server action you will likely have to revaildate. It's also possible to revaliadate on a timer for pages where constant updates aren't critical (in this case a home page delivering a list of topics). By default all dynamic routes will be dynamic.

For this project we moved the header into a separate client co mponent because it was causing the entire home page to be dynamic (due to the fact that the auth was modifying cookies). That allowed it to make requests to the backend using useSession instead.

2. Advantageous to create a paths helper in case file paths change in the future:

```js

const paths = {
  home() {
    return "/";
  },
  topicShow(topicSlug: string) {
    return `/topics/${topicSlug}`;
  },
  postCreate(topicSlug: string) {
    return `/topics/${topicSlug}/posts/new`;
  },
  postShow(topicSlug: string, postId: string) {
    return `/topics/${topicSlug}/posts/${postId}`;
  },
};

export default paths;

```

3. useFormState allows you to pass validation errors back from the server. Critical for type saftey to make sure the error object is the same shape in the form and in the action. Have to return an empty object of the same shape even if the action is successfull.

```js
const [formState, action] = useFormState(createTopic, { errors: {} });
return <form action={action}>......</form>;
```

and in the server action:

```js

// create zod validation schema
const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters or dashes without spaces",
    }),
  description: z.string().min(10),
});

//create type for the FormState

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

// action takes in the FormState (empty error object to start) and the FormData and returns a promise with the same shape

export async function createTopic(
  formState: CreateTopicFormState,
  Formdata: FormData
): Promise<CreateTopicFormState> {

  const result = createTopicSchema.safeParse({
    name: Formdata.get("name"),
    description: Formdata.get("description"),
  });
  const session = await auth();

  // validation errors
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }
  // check if use is signed in
  if (!session) {
    return { errors: { _form: ["You must be signed in to create a topic"] } };
  }

  // try/catch for writing to the db in order to catch errors and add them to the same form
  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: { slug: result.data.name, description: result.data.description },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    } else {
      return { errors: { _form: ["Uh oh, something went wrong"] } };
    }
  }
  redirect(paths.topicShow(topic.slug));

  // return an empty error object to keep everyone happy
  return { errors: {} };
}
```

4. useFormStatus to create a loading state for the form. NOTE: hook has to be used in a child component. In this case it was embedded in the submit button for the form & then used to trigger a loading icon in the button.

5. Combined the auth provider and nextUI provider into a single component and then wrap the whole app in the main layout:

```js
export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}
```

6. Created a more reusable `<PostList/>` component by defining separate query funcions, then passing them down from the parent component depending on where it's displayed. That way we can grab posts from a variety of topics on the home page, and only specific posts on the individual topic page.

7. Recursive components:

- first you render the top level comments (which have no parentId) as a list of comments `<CommentList/>`. It receives a custom query function that fetches comments based on the postId.
- Each `<CommentShow />` also recieves the fetched comments, and finds its children by filtering the comments where parentId === commentId
- `<CommentShow />` then renders the data from the parent comment, another input for replys, and all of the children comments underneath.
- that recursive property continues so that replys to children comments are rendered the same way

8. Any component that uses the useSearchParams() hook needs to be wrapped in `<Suspense>` or it won't work. No need to add a fallback prop.
