defmodule Sling.MessageView do
  use Sling.Web, :view

  def render("index.json", %{messages: messages, pagination: pagination}) do
    %{
      data: render_many(messages, Sling.MessageView, "message.json"),
      pagination: pagination
    }
  end

  def render("message.json", %{message: message}) do
    %{
      id: message.id,
      inserted_at: message.inserted_at,
      text: message.text,
      user: %{
        email: message.user.email,
        username: message.user.username,
        user_avatar: message.user.user_avatar
      }
    }
  end
end