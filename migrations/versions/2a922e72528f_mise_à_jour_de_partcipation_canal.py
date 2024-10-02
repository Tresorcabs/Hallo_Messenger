"""Mise à jour de partcipation_canal

Revision ID: 2a922e72528f
Revises: 
Create Date: 2024-09-10 12:12:10.430995

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2a922e72528f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('participation_canal', schema=None) as batch_op:
        batch_op.create_unique_constraint("uq_unique_participation_canal_id", ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('participation_canal', schema=None) as batch_op:
        batch_op.drop_constraint("uq_unique_participation_canal_id", type_='unique')

    # ### end Alembic commands ###
