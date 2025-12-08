-- CreateTable
CREATE TABLE "userapi_userprofile" (
    "id" BIGSERIAL NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "age" INTEGER NOT NULL,
    "password" VARCHAR(100),
    "is_active" BOOLEAN NOT NULL,
    "date_joined" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" VARCHAR(150) NOT NULL,
    "is_staff" BOOLEAN NOT NULL,
    "is_superuser" BOOLEAN NOT NULL,
    "last_login" TIMESTAMPTZ(6),
    "last_name" VARCHAR(150) NOT NULL,
    "username" VARCHAR(150) NOT NULL,
    "name" VARCHAR(150),
    "totalservice" INTEGER DEFAULT 0,
    "is_verified" BOOLEAN DEFAULT false,
    "imagepublicid" TEXT,
    "imageurl" TEXT,
    "role" VARCHAR(10) DEFAULT 'USER',

    CONSTRAINT "userapi_userprofile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "userId" BIGINT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "thumbnail" TEXT,
    "imageurl" TEXT,
    "imagepublicid" TEXT,
    "isactive" BOOLEAN DEFAULT true,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enquiry" (
    "id" SERIAL NOT NULL,
    "user_id" BIGINT,
    "service_id" BIGINT,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "phone" VARCHAR(20),
    "message" TEXT NOT NULL,
    "status" VARCHAR(20) DEFAULT 'pending',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Enquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userapi_userprofile_email_key" ON "userapi_userprofile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "fk_user" FOREIGN KEY ("userId") REFERENCES "userapi_userprofile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Enquiry" ADD CONSTRAINT "Enquiry_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enquiry" ADD CONSTRAINT "fk_user_enquiry" FOREIGN KEY ("user_id") REFERENCES "userapi_userprofile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
