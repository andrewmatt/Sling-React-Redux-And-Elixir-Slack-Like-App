defmodule Sling.User do
  use Sling.Web, :model

  schema "users" do
    field :username, :string
    field :email, :string
    field :password_hash, :string
    field :password, :string, virtual: true
    field :user_avatar, :string
    many_to_many :rooms, Sling.Room, join_through: "user_rooms"
    has_many :messages, Sling.Message

    timestamps()
  end
  #usually used for validation
  #we call it by specifying an empty struct as the first parameter: %Sling.User{}
  #and by adding a hash of values to cast onto this struct such as 
  # %{email: "a@a.a", username: "aaa", password_hash: "pass"}

  #varsall error fix:
  #nmake error for comeonin fix
  #go to program files -> visual studio 14 -> VC -> open command prompt -> write "vcvarsall.bat amd64"
  #write iex -S mix after and it compiles properly
  # (or just cd C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC)
  # (and then cd C:\Users\Mathaeus\Documents\Visual Studio Code\sling\api)

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:username, :email, :user_avatar])
    |> validate_required([:username, :email])
    |> unique_constraint(:username)
    |> unique_constraint(:email)
  end

  def registration_changeset(struct, params) do
    struct
    |> changeset(params)
    |> cast(params, [:password])
    |> validate_length(:password, min: 6, max: 100)
    |> put_password_hash()
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(password))
      _ ->
        changeset
    end
  end
end