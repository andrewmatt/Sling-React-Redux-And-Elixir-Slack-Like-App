defmodule Sling.Repo.Migrations.AddFieldToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :user_avatar, :string
   end
  end
end
