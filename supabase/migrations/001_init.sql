-- Plantie 資料庫初始化遷移腳本

-- 用戶相關表
create table users (
  id uuid references auth.users primary key,
  username text unique,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

create table user_settings (
  user_id uuid references users(id) primary key,
  notification_preferences jsonb default '{}'::jsonb,
  privacy_settings jsonb default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 商品相關表
create table products (
  id uuid default uuid_generate_v4() primary key,
  seller_id uuid references users(id),
  title text not null,
  description text,
  price decimal(10,2) not null,
  status text check (status in ('draft', 'published', 'sold', 'archived')),
  images text[],
  category text,
  tags text[],
  location jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

create table product_views (
  product_id uuid references products(id),
  viewer_id uuid references users(id),
  viewed_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (product_id, viewer_id)
);

-- 訂單相關表
create table orders (
  id uuid default uuid_generate_v4() primary key,
  buyer_id uuid references users(id),
  seller_id uuid references users(id),
  product_id uuid references products(id),
  status text check (status in ('pending', 'paid', 'shipped', 'completed', 'cancelled')),
  amount decimal(10,2) not null,
  shipping_address jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

create table reviews (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id),
  reviewer_id uuid references users(id),
  rating integer check (rating >= 1 and rating <= 5),
  content text,
  images text[],
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 聊天相關表
create table chats (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references products(id),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table chat_participants (
  chat_id uuid references chats(id),
  user_id uuid references users(id),
  last_read_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (chat_id, user_id)
);

create table messages (
  id uuid default uuid_generate_v4() primary key,
  chat_id uuid references chats(id),
  sender_id uuid references users(id),
  content text,
  type text check (type in ('text', 'image', 'system')),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 社群相關表
create table posts (
  id uuid default uuid_generate_v4() primary key,
  author_id uuid references users(id),
  content text,
  images text[],
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

create table post_likes (
  post_id uuid references posts(id),
  user_id uuid references users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (post_id, user_id)
);

create table comments (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references posts(id),
  author_id uuid references users(id),
  content text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

create table follows (
  follower_id uuid references users(id),
  following_id uuid references users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (follower_id, following_id)
);

-- 索引設計
create index users_username_idx on users using btree (username);
create index users_display_name_idx on users using btree (display_name);
create index products_title_idx on products using btree (title);
create index products_status_idx on products using btree (status);
create index products_seller_id_idx on products using btree (seller_id);
create index products_category_idx on products using btree (category);
create index products_created_at_idx on products using btree (created_at);
create index orders_buyer_id_idx on orders using btree (buyer_id);
create index orders_seller_id_idx on orders using btree (seller_id);
create index orders_status_idx on orders using btree (status);
create index orders_created_at_idx on orders using btree (created_at);
create index messages_chat_id_created_at_idx on messages using btree (chat_id, created_at);
create index chat_participants_user_id_idx on chat_participants using btree (user_id);
create index posts_author_id_idx on posts using btree (author_id);
create index posts_created_at_idx on posts using btree (created_at);
create index comments_post_id_idx on comments using btree (post_id);
create index comments_author_id_idx on comments using btree (author_id);

-- 觸發器
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger update_users_updated_at
  before update on users
  for each row
  execute function update_updated_at_column();
-- 其他表的觸發器可依需求補充

-- 權限設計
alter table users enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table messages enable row level security;
alter table posts enable row level security;

create policy "用戶可以讀取所有公開資料"
  on users for select
  using (true);

create policy "用戶只能更新自己的資料"
  on users for update
  using (auth.uid() = id);
-- 其他表的權限策略可依需求補充 