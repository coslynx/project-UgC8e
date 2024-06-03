import discord
from discord.ext import commands

class Ban(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command(name='ban', help='Ban a user from the server')
    @commands.has_permissions(ban_members=True)
    async def ban(self, ctx, member: discord.Member, *, reason=None):
        if member == ctx.author:
            await ctx.send('You cannot ban yourself.')
            return
        if member.top_role >= ctx.author.top_role:
            await ctx.send('You do not have permission to ban this user.')
            return
        if reason is None:
            reason = 'No reason provided'
        
        try:
            await member.ban(reason=reason)
            await ctx.send(f'{member.mention} has been banned. Reason: {reason}')
        except:
            await ctx.send('An error occurred while trying to ban the user.')

def setup(bot):
    bot.add_cog(Ban(bot))