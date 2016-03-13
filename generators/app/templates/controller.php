<?php
/**
 * Controller description
 *
 * @category   <%= namespace %>
 * @package    <%= moduleName %>
 * @author     <%= author.name %> <<%= author.email %>>
 */
class <%= moduleName %>_IndexController extends Mage_Core_Controller_Front_Action
{
    /**
     * indexAction description
     *
     * @return void
     */
    public function indexAction()
    {
        $this->loadLayout();
        $this->renderLayout();
    }
}
