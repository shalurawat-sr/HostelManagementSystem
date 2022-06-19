namespace HostelManagment.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class HMSMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Admins",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        DOB = c.String(),
                        Gender = c.String(),
                        EmailId = c.String(),
                        MobileNo = c.String(),
                        Address = c.String(),
                        IdProof = c.String(),
                        Username = c.String(),
                        Password = c.String(),
                        LastLogin = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.RoomAllocations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StudentId = c.Int(nullable: false),
                        RoomId = c.Int(nullable: false),
                        IsCheckout = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Rooms",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RoomNo = c.Int(nullable: false),
                        RoomType = c.String(),
                        BedsCount = c.Int(nullable: false),
                        AllotedBedsCount = c.Int(nullable: false),
                        Fee = c.Double(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Students",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        DOB = c.String(),
                        Gender = c.String(),
                        EmailId = c.String(),
                        MobileNo = c.String(),
                        CollegeName = c.String(),
                        Address = c.String(),
                        IdProof = c.String(),
                        Username = c.String(),
                        Password = c.String(),
                        LastLogin = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Students");
            DropTable("dbo.Rooms");
            DropTable("dbo.RoomAllocations");
            DropTable("dbo.Admins");
        }
    }
}
