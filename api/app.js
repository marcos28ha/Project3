import { Application, Router } from "./deps.js"
import { getAll, createMessage, createResponse } from "./messageService.js"
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const app = new Application();

const router = new Router();

const newMessage = async({request, response}) => {
  const body = request.body({ type: "json" })
  const params = await body.value
  const content = params.content

  response.body = await createMessage(content)
}

const getMessages = async({request, response}) => {
  const res = await getAll()
  response.body = res
}

const addResponse = async({request, response, params}) => {
  const id = params.id
  const body = request.body()
  const value = await body.value
  const content = value.content
  const res = await createResponse(content, id)
  response.body = res
}

router.get("/", getMessages)
router.post("/", newMessage)
router.post("/:id", addResponse)

app.use(oakCors())
app.use(router.routes());

app.listen({ port: 3001 });

