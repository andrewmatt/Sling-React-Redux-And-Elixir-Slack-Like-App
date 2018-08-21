defmodule Sling.UserView do
  use Sling.Web, :view

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      username: user.username,
      email: user.email,
      user_avatar: user.user_avatar,
    }
  end
end